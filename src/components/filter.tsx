'use client';

import FilterSubjectType from "./filter-subject-type";
import FilterYear from "./filter-year";
import FilterType from "./filter-type";
import FilterNation from "./filter-nation";

export default function Filter() {
  
  return (
    <section className="mt-4 flex flex-row gap-2">
      <FilterSubjectType />
      <FilterYear />
      <FilterType />
      <FilterNation />
    </section>
  )
}