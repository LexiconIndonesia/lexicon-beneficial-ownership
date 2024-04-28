"use client";

import Filter from "@/components/filter";
import PersonList from "@/components/person-list";
import SearchBar from "@/components/search-bar";
import { getCases } from "@/data/get-cases";
import { GetCasesParams, GetCasesResponse } from "@/data/response";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function Home() {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<GetCasesResponse[]>([]);

  async function getCasesFirebase(param: GetCasesParams) {
    setIsLoading(true);
    const response = await getCases(param);
    setData(response);
    setIsLoading(false);
  }

  useEffect(() => {
    getCasesFirebase({
      keyword: params.get('query') ?? '',
      filterSubjectType: params.getAll('subjects'),
      filterNation: params.get('nations') ?? '',
      filterFrom: params.get('from') ?? '',
      filterTo: params.get('to') ?? '',
      filterType: params.getAll('types')
    })
  }, [params]);

  return (
    <main className="py-8 px-4 sm:px-12">
      <SearchBar />
      <Filter />
      <PersonList cases={data} isLoading={isLoading} />
    </main>
  );
}
