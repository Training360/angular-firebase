import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  all: Observable<any>;
  itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    private firestore: AngularFirestore,
  ) {
    this.itemsCollection = this.firestore.collection('users');
    this.all = this.itemsCollection.valueChanges({
      idField: 'docID'
    });
  }

  create(doc: any): Promise<any> {
    return this.itemsCollection.add( {...doc} );
  }

  update(doc: any): Promise<any> {
    const id = doc.docID;
    delete doc.docID;
    return this.itemsCollection.doc(id).update( {...doc} );
  }

  delete(doc: any): Promise<any> {
    return this.itemsCollection.doc(doc.docID).delete();
  }
}
