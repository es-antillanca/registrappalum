import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }
  getDoc<tipo>(path: string, id: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }


  getCollectionQuery<tipo>(path: string, param: string, condition: any, search: any) {
    const collection = this.firestore.collection<tipo>(path, ref =>
      ref.where(param, condition, search));
    return collection.valueChanges();
  }

  getId() {
    return this.firestore.createId()
  }

  getCollectionGroup(path: string, param: string, condition: any, search: any) {
    const collection = this.firestore.collectionGroup(path, ref =>
      ref.where(param, condition, search));
    return collection.valueChanges();
  }


}
