import * as _ from 'underscore';

function strip(linesTSA: TemplateStringsArray) {
    let lines = linesTSA[0].split('\n');
    let min = _.min(
        lines
            .filter(line => line.trim())
            .map(line => {
                const match = /^ */.exec(line);
                return match ? match[0].length : Infinity;
            }),
    );
    return lines
        .map(line => line.substring(min))
        .join('\n')
        .trim();
}

export { strip };
