"use client";

import { Snippet } from "@nextui-org/snippet";
import { title } from "@/components/primitives";
import ParamsHandler from "@/components/params-handler";
import {Suspense, useState} from "react";
import {Link} from "@nextui-org/link";

export default function Home() {
  const [changed, setChanged] = useState<Record<string, string>>({});

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Bad&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Query&nbsp;</h1>
        <br />
        <h1 className={title()}>
          Params.
        </h1>
      </div>

      <div className="flex gap-3">
          <Suspense>
            <ParamsHandler onChange={setChanged}/>
          </Suspense>
      </div>

        <div className='p-5'>
            <p>on change value:</p>
            <pre className='bg-danger p-5 rounded-xl'>{JSON.stringify(changed, null, 2)}</pre>
        </div>

      <div className="mt-8">
          <h1 className={title()}>THE CODE&nbsp;</h1>

        <Snippet hideCopyButton hideSymbol variant="flat">
          <span>
            SEE SOURCE CODE <Link href='https://github.com/bnohad/nextui-bad-queris-mobile'
                                  isExternal
                                  color="primary">HERE</Link>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
