"use client";

import { Button, Divider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import SearchIcon from "./icons/SearchIcon";
import FilterSubjectType from "./FilterSubjectType";
import FilterType from "./FilterType";
import FilterNation from "./FilterNation";
import FilterYear from "./FilterYear";
import { useRouter, useSearchParams } from "next/navigation";

export default function HeroLanding(): React.ReactElement {
  const params = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [nations, setNations] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  useEffect(() => {
    setQuery(params.get("query") ?? "");
  }, []);

  const handleSearchClicked = (): void => {
    const newParams = new URLSearchParams(params);
    newParams.delete("subjects");
    newParams.delete("types");
    newParams.delete("nation");
    newParams.delete("query");
    newParams.delete("from");
    newParams.delete("to");

    newParams.set("query", query);
    if (from.length > 0) {
      newParams.set("from", from);
    }
    if (to.length > 0) {
      newParams.set("to", to);
    }
    Array.from((subjects ?? []).values()).forEach((subject) => {
      newParams.append("subjects", subject);
    });
    Array.from((types ?? []).values()).forEach((subject) => {
      newParams.append("types", subject);
    });
    Array.from((nations ?? []).values()).forEach((subject) => {
      newParams.append("nations", subject);
    });
    if (query.length === 0) newParams.delete("query");
    router.replace(`/data?${newParams.toString()}`, { scroll: false });
  };
  return (
    <div className="px-4 md:px-36 py-8 sm:py-[192px] flex flex-col justify-center items-center">
      <img
        src="/images/img_background_large.png"
        alt="Background Hero"
        className="absolute top-0 z-0 mt-2 hidden sm:block"
      />
      <div className="flex flex-col items-center bg-white z-10">
        <h1 className="text-[40px] font-semibold">
          Discover Procurement Integrity with{" "}
          <span className="text-colorPrimary">
            Lexicon Beneficiary Ownership
          </span>
        </h1>
        <h3 className="text-textGrayBold text-xl mt-2 font-normal">
          Quickly identify individuals or companies with a track record of fraud
          and corruption.
        </h3>
      </div>
      <div className="w-full mt-9 py-4 px-5 bg-white border border-colorBorder rounded-xl flex flex-row gap-6 z-10 items-center">
        <div className="w-full flex flex-col gap-3">
          <input
            className="outline-none w-full font-normal text-sm placeholder-textGray40"
            onInput={(input) => {
              setQuery(input.currentTarget.value);
            }}
            value={query}
            placeholder="Enter individual or company name..."
          />
          <Divider className="border border-colorBorder" />
          <div className="flex flex-col sm:flex-row gap-6">
            <FilterSubjectType
              onSelectedSubjects={(subjects: string[]) => {
                setSubjects(subjects);
              }}
            />
            <FilterType
              onSelectedTypes={(types: string[]) => {
                setTypes(types);
              }}
            />
            <FilterNation
              onSelectedNations={(nations) => {
                setNations(nations);
              }}
            />
            <FilterYear
              setSelectedYear={(from: string, to: string) => {
                setFrom(from);
                setTo(to);
              }}
            />
            <Button
              onClick={handleSearchClicked}
              className="block sm:hidden bg-colorPrimary text-md font-semibold text-white"
            >
              Search
            </Button>
          </div>
        </div>
        <Button
          onClick={handleSearchClicked}
          isIconOnly
          radius="full"
          className="hidden sm:flex bg-colorPrimaryBackground"
        >
          <SearchIcon />
        </Button>
      </div>
      {/* <div className='w-full mt-9 py-4 px-5 bg-white border border-colorBorder rounded-xl flex flex-row gap-6 z-10 items-center'>
        <div className='w-full flex flex-col gap-3'>
          <input className='outline-none w-full font-normal text-sm placeholder-textGray40' placeholder='Enter individual or company name...' />
          <Divider className='border border-colorBorder' />
          <div className='flex flex-col sm:flex-row gap-6'>
            <FilterSubjectType />
            <FilterType />
            <FilterNation />
            <FilterYear />
            <Button className='block sm:hidden bg-colorPrimary text-md font-semibold text-white'>
              Search
            </Button>
          </div>
        </div>
        <Button isIconOnly radius='full' className='hidden sm:flex bg-colorPrimaryBackground'>
          <SearchIcon />
        </Button>
      </div> */}
      {/*
      <div className='w-full sm:w-3/5 flex flex-row items-center gap-3 px-5 border rounded-full mt-9'>
        <SearchIcon />
        <input onKeyDown={(event) => {
          if (event.key === 'Enter') {
            router.replace('/data?query=' + event.currentTarget.value)
          }
        }} className='w-full flex-1 py-3 px-1 sm:px-2 outline-none' type="search" placeholder='Enter company name or individual...' />
      </div> */}
    </div>
  );
}
