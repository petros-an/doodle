import React, {useEffect} from 'react';
import './readonly.css'
import {useParams} from "react-router-dom";
import DoodleService from "../../services/doodle.js";

function Readonly() {
    const [state, setState] = React.useState(
        {
            text: '',
            loading: true,
        }
    );

    const {doodleId} = useParams()

    const {text, loading} = state

    useEffect(() => {
        DoodleService.getOrCreate(doodleId).then(
            (doodle) => {
                setState(
                    prevState => {
                        return {
                            ...prevState,
                            loading: false,
                            text: doodle.text,
                        }
                    }
                )
            }
        )

    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return <pre className={"codesnippet"} id={"readonly"}>
        <code>
            {text}
        </code>

    </pre>


}

export default Readonly;