import firebaseApp from "@/utils/firebase-config";
import { collection, getDoc, getDocs, getFirestore, limit, query, where } from "firebase/firestore";
import { GetCasesParams, GetCasesResponse } from "./response";

const db = getFirestore(firebaseApp);
export async function getCases(params: GetCasesParams) {
  const casesCollection = collection(db, 'cases');
  
  let queryRef = query(casesCollection, limit(100));

  if (params.keyword) {
    queryRef = query(casesCollection, where('subject', '>=', params.keyword));
    queryRef = query(casesCollection, where('subject', '>=', params.keyword.toLowerCase()));
    queryRef = query(casesCollection, where('subject', '>=', params.keyword.toUpperCase()));
  }
  if (params.filterSubjectType && params.filterSubjectType.length > 0) {
      if (Array.isArray(params.filterSubjectType)) {
        queryRef = query(queryRef, where('subject_type', 'in', params.filterSubjectType));
      } else {
        queryRef = query(queryRef, where('subject_type', '==', params.filterSubjectType));
      }
    }

    if (params.filterType && params.filterType.length > 0) {
      if (Array.isArray(params.filterType)) {
        queryRef = query(queryRef, where('type', 'in', params.filterType));
      } else {
        queryRef = query(queryRef, where('type', '==', params.filterType));
      }
    }

    if (params.filterFrom) {
      queryRef = query(queryRef, where('year', '>=', params.filterFrom));
    }

    if (params.filterTo) {
      queryRef = query(queryRef, where('year', '<=', params.filterTo));
    }

    if (params.filterNation && params.filterNation.length > 0) {
      if (Array.isArray(params.filterNation)) {
        queryRef = query(queryRef, where('nation', 'in', params.filterNation));
      } else {
        queryRef = query(queryRef, where('nation', '==', params.filterNation));
      }
    }

    const result = await getDocs(queryRef);

    return result.docs.map((doc) => {
      return {
        id: doc.id,
        subject: doc.data().subject,
        subject_type: doc.data().subject_type,
        person_in_charge: doc.data().person_in_charge,
        year: doc.data().year,
        type: doc.data().type,
        decision_number: doc.data().decision_number,
        nation: doc.data().nation,
        source: doc.data().source,
        link: doc.data().link,
        summary: doc.data().summary,
        punishment_duration: doc.data().punishment_duration,
        beneficary_ownership: doc.data().beneficary_ownership,
      }
    });
}

export async function getCase(id: string) {
  const casesCollection = collection(db, 'cases');
  let queryRef = query(casesCollection, limit(100));
  const result = await getDocs(queryRef);
  const find = result.docs.find((doc) => doc.id === id);
  return {
    id: find?.id,
    subject: find?.data().subject,
    subject_type: find?.data().subject_type,
    person_in_charge: find?.data().person_in_charge,
    year: find?.data().year,
    type: find?.data().type,
    decision_number: find?.data().decision_number,
    nation: find?.data().nation,
    source: find?.data().source,
    link: find?.data().link,
    summary: find?.data().summary,
    punishment_duration: find?.data().punishment_duration,
    beneficary_ownership: find?.data().beneficary_ownership,
  };
}