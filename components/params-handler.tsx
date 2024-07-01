"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState} from "react";
import { Chip } from "@nextui-org/chip";
import { title} from "@/components/primitives";
import {Button} from "@nextui-org/button";

export default function ParamsHandler({ onChange }: { onChange?: (params: Record<string, string>) => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    if (params && params.size > 0) {
      const currentFilters = Array
        .from(params.entries())
        .reduce((ret, [k, v]) => {
          ret[k] = v;
          return ret;
        }, {} as Record<string, string>);

      setSelectedFilters(currentFilters);

      if (typeof onChange === "function") {
        onChange(currentFilters);
      }
    } else {
      setSelectedFilters({});

      if(typeof onChange === "function") {
        onChange({});
      }
    }
  }, [params]);

  const removeFilter = (type: string) => {
    let qparams = new URLSearchParams(selectedFilters);

    if (qparams.has(type)) {
      qparams.delete(type);
    }
    if (qparams.size > 0) {
      router.push(`${pathname}?${qparams.toString()}`);
    } else {
      // window.history.pushState(null, "", "?")
      router.push(`${pathname}`);
    }
  };

  const chips = useMemo(() => Object
      .entries(selectedFilters)
      .map(([key, value]) =>
        <Chip variant="flat"
              key={key}
              onClose={() => removeFilter(key)}>
          {key}: {value}
        </Chip>),
    [selectedFilters],
  );

  return (
    <div className="w-full text-center rounded-xl p-5 border-warning border-1 border-dashed">
      <h4 className='text-danger'>&lt;ParamsHandler&gt;</h4>
      <span className={title({color: "blue"})}>THE PARAMS</span>
      <br />
      {params.toString()}
      <br />
      <br />
      <span className={title({color: "yellow"})}>THE CHIPS</span>
      <br />
      {chips}
      <br />
      <br />
      <Button onClick={() => router.push('?mynew=chip')}>Replace query</Button>
      <h4 className='text-danger'>&lt;/ParamsHandler&gt;</h4>
    </div>
  );
}
