import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore'

import serviceAccount from "../keyserver.json" 

initializeApp({
  credential: cert(serviceAccount as any)
});

const db = getFirestore();

export{
    db
}