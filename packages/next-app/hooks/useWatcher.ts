import { useEffect, useState } from "react";

function useWatcher<S>(changingState:S){
    const [state, setState] = useState(changingState);
    useEffect(() => {
        setState(changingState);
    }, [changingState]);

    return [state, setState] as const;
}

export default useWatcher;
