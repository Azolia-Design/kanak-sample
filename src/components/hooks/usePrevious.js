import { useRef } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

function usePrevious(value) {
    const ref = useRef();
    useIsomorphicLayoutEffect(() => {
        ref.current = value;
    }, [value])
    return ref.current;
}
export default usePrevious;