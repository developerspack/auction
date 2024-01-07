"use client";

import { useEffect, useState } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-hot-toast";

import { auth, db, storage } from "@/lib/firebase";
import { useUserStore } from "@/store/user";
import { Button } from "@/components/ui/button";

export const LoginWithGoogle = () => {
  const { setUser } = useUserStore();
  // login with google
  const Login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // UserState
        const GetUser = async () => {
          const DocRef = doc(db, "users", result.user.uid);
          const DocSnap = await getDoc(DocRef);
          if (!DocSnap.exists()) {
            setDoc(doc(db, "users", result.user.uid), {
              id: result.user.uid,
              email: result.user.email,
              photo: result.user.photoURL,
              name: result.user.displayName,
              createdAt: Timestamp.now().toDate().toString(),
            });
          }
        };

        const authData = {
          isLoggedIn: true,
          email: result.user.email,
          Name: result.user.displayName,
          photo: result.user.photoURL,
          id: result.user.uid,
        };
        localStorage.setItem("auth", JSON.stringify(authData));
        // @ts-ignore
        setUser(authData);
        GetUser();
        toast.success("Login Successful");
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };
  return (
    <Button size="sm" variant="primary" onClick={() => Login()}>
      Login
    </Button>
  );
};

// Hnadle Delete
export const HandleDelete = async (
  id: string,
  collectionName: string,
  imageUrl?: string,
  otherImages?: string[],
  video?: string
) => {
  const notification = toast.loading(`Deleteting ${collectionName}...`);
  try {
    if (imageUrl) {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    }
    if (video) {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    }
    if (otherImages) {
      for (const image of otherImages) {
        const storageRef = ref(storage, image);
        await deleteObject(storageRef);
      }
    }
    await deleteDoc(doc(db, collectionName, id));
    toast.success(`${collectionName} Deleteted Successfully!`, {
      id: notification,
    });
  } catch (error) {
    toast.error((error as Error).message, {
      id: notification,
    });
  }
};

// upload doc
export const uploadDocument = async (
  collectionName: string,
  values: object
) => {
  const notification = toast.loading(`Creating ${collectionName}...`);
  try {
    await addDoc(collection(db, collectionName), {
      ...values,
      createdAt: Timestamp.now().toDate().toString(),
    });
    toast.success(`${collectionName} Created Successfully!`, {
      id: notification,
    });
  } catch (error) {
    toast.error((error as Error).message, {
      id: notification,
    });
  }
};

// update doc
export const UpdateDcoument = async (
  collectionName: string,
  id: string,
  values: object
) => {
  const notification = toast.loading(`Updating ${collectionName}...`);
  try {
    await updateDoc(doc(db, collectionName, id), {
      ...values,
      updatedAt: Timestamp.now().toDate().toString(),
    });
    toast.success(`${collectionName} Updated Successfully!`, {
      id: notification,
    });
  } catch (error) {
    toast.error((error as Error).message, {
      id: notification,
    });
  }
};

// get collection
export const FetchCollection = (
  collectionName: string,
  value: string | boolean,
  field: string
) => {
  const [data, setData] = useState<itemProps | userProps | bidProps | any | []>(
    []
  );
  const [loading, setloading] = useState(true);

  const getCollection = () => {
    try {
      const q = query(
        collection(db, collectionName),
        where(field, "==", value)
      );
      // const q = query(docRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(allData);
        // @ts-ignore
        setData(allData);
        setloading(false);
      });
    } catch (error) {
      setloading(false);
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data, loading };
};

// get doc
export const FetchDocument = (collectionName: string, id: string) => {
  const [document, setDocument] = useState<itemProps | userProps | any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDocument = async () => {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        const obj = {
          id: id,
          ...docSnap.data(),
        };
        setDocument(obj);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Document not found");
      }
    };
    id && getDocument();
  }, [id]);
  return { isLoading, document };
};

// get collection
export const FetchDocuments = (collectionName: string) => {
  const [data, setData] = useState<itemProps | userProps | any>([]);
  const [loading, setloading] = useState(true);

  const getCollection = () => {
    try {
      const q = query(collection(db, collectionName));
      // const q = query(docRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(allData);
        // @ts-ignore
        setData(allData);
        setloading(false);
      });
    } catch (error) {
      setloading(false);
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data, loading };
};
