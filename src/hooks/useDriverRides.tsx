import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore'; // Assuming Firebase is set up
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

interface Ride {
  id: string;
  [key: string]: any;
}

const useDriverRides = (userID: string | undefined) => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const ridesSnapshot = await firestore()
          .collection('rides')
          .where('driverInfo.uid', '==', userID)
          .get();

        const ridesData: Ride[] = ridesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRides(ridesData);
      } catch (err) {
        setError('Failed to fetch rides');
        console.error('Error fetching rides: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [userID]);

  return {rides, loading, error};
};

export default useDriverRides;
