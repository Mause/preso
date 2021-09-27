import React from "react";
import CodePage from "../CodePage";
import { strip } from "../strip";

export default function Slide5() {
    return <CodePage codes={[
        strip`
        import micropip
        await micropip.install('cowsay')

        import sys
        from cowsay import cow
        from io import StringIO

        sys.stdout = StringIO()
        cow('hello')
        sys.stdout.getvalue()
        `
    ]} />
}