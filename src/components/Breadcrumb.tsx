import { BreadCrumbNode } from "@/types";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

interface Props {
  breadcrumb: BreadCrumbNode[] | undefined;
  currentNode: string;
}

export default async function BreadCrumb({
  breadcrumb = [],
  currentNode,
}: Props) {
  return (
    <div className="mt-4">
      {breadcrumb?.length && (
        <>
          <span className="">
            {breadcrumb?.map((node, index) => (
              <React.Fragment key={index}>
                <Link
                  href={`/category/${node.category_url_key}`}
                  className="hover:underline hover:text-blue-700"
                >
                  <span>{node.category_name}</span>
                </Link>

                {index < breadcrumb.length - 1 && (
                  <span className="mx-3">
                    <ChevronRightIcon className="inline-block w-5 h-5 mb-1" />
                  </span>
                )}
              </React.Fragment>
            ))}
            <span className="mx-3">
              <ChevronRightIcon className="inline-block w-5 h-5 mb-1" />
            </span>
          </span>
          <span className="text-gray-600">{currentNode}</span>
        </>
      )}
    </div>
  );
}
