import React from 'react';
import './about.css'


function About() {


    return <div id={"about"}>
        <p>
            <strong>JDL</strong>, or JSON Doodling Language, is an attempt to
            standardize how we create and communicate JSON schemas.
            For example, a <i>book</i> object might look like this:
        </p>
        <pre className={"codesnippet"}>
            <code>
                {`{
   "title": "Kitchen Confidential",
   "author": "Anthony Bourdain",
   "price": 10.4,
   "genres": ["cooking", "biographical"]
}`
                }
            </code>
        </pre>

        <p>
            To communicate the <i>definition</i> of a book's schema, we might write:
        </p>
        <pre className={"codesnippet"}>
            <code>
                {`Genre -> Enum(
    "biographical",
    "cooking",
    "nonfiction",
    "fantasy",
    "sci-fi",
    "mystery",
    ...
)

Book -> {
   "title": string,
   "author": string,
   "price": float,
   "genres": list[Genre]
}`
                }
            </code>
        </pre>

        <p>
            <strong>JDL</strong> specifies the syntax for how that definition should look like,
            in order to standardize it and allow use of tools commonly available for all programming languages.
            For example, in the <a href={"/"}>Editor</a> we have:
            <ul>
                <li>Syntax highlighting</li>
                <li>Highlighting of errors, for example duplicate definitions</li>
                <li>Autocompletion</li>
                <li>Refactoring tools: renaming of a type, extracting a block of code (subschema)</li>
            </ul>

        </p>

        <p>
            To declare a primitive type:
            <pre className={"codesnippet"}>
                <code>
                    date {"->"} string
                    # or int, bool, float, UUID
                </code>
            </pre>
        </p>

        <p>
            Enums:
            <pre className={"codesnippet"}>
                <code>
                    x {"->"} Enum("a", "b", "c)
                </code>
            </pre>
            Lists:
            <pre className={"codesnippet"}>
                <code>
                    x {"->"} list[string]
                </code>
            </pre>
            Or a full JSON object:
            <pre className={"codesnippet"}>
                <code>{`{
    "key1": type1,
    "key2": type2
}
`}
                </code>
            </pre>
        </p>

        <p>
            The full specification (language grammar) for JDL is <a href={""}>here</a>
        </p>

    </div>
}

export default About;