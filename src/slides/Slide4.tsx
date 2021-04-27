import * as React from 'react';
import CodePage from '../CodePage';
import { strip } from '../strip';

export default function Slide4() {
  return <CodePage codes={[
    strip`
        import js
        import micropip
        from asyncio import run

        def internal():
          print(await micropip.install('pydantic'))
          from pydantic import BaseModel

          class Model(BaseModel):
            string: str

          return Model(string='hello')

        run(internal)
    `,
    strip`
      import pandas as pd

      df = pd.DataFrame([
        {
          'voters': 5
        },
        {
          'voters': 10
        }
      ])

      [df.voters.max(), df.voters.min(), df.voters.mean()]
    `
  ]} />;
}
