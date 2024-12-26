import { MutableRefObject, useEffect } from "react";

export default function useOutsideClickHandler(
  ref: MutableRefObject<any>,
  callback: Function,
  excludeRefs: MutableRefObject<any>[] = []
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const currentRef = ref.current;
      const excludeRefsCurrent = excludeRefs.map(
        (excludeRef) => excludeRef.current
      );
      const isOutsideClick = currentRef && !currentRef.contains(event.target);
      const isExcludeRefsClick = excludeRefsCurrent.some((excludeRef) =>
        excludeRef.contains(event.target)
      );

      if (isOutsideClick && !isExcludeRefsClick) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, excludeRefs]);
}

interface Props {
  children: React.ReactNode;
  callback: Function;
}
