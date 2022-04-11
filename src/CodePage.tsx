import { Component } from 'react';
import { ContentSlide, Step } from 'react-presents';
import Highlight from 'react-highlight';
import _ from 'underscore';
import 'bulma/css/bulma.css';
import { from, Subject, Observable, Subscription } from 'rxjs';
import {
  map,
  mergeAll,
  distinctUntilChanged,
  catchError,
} from 'rxjs/operators';
import { Columns } from 'react-bulma-components';

export const pyodide = import("pyodide/pyodide.js").then(pyodidePkg => pyodidePkg.loadPyodide());

async function getPyodide() {
  const pyo = await pyodide;

  console.log('pyodide version: ' + pyo.version);

  return pyo;
}

function padToThree(string: string): string {
  const splitString = string.split('\n');
  for (var i = 4 - splitString.length; i >= 0; i--) {
    splitString.push('');
  }
  return splitString.join('\n');
}

function make(index: number, code: string): JSX.Element {
  return (
    <Step index={index} key={index}>
      <Highlight className={'python'}>{padToThree(code ? code : '')}</Highlight>
    </Step>
  );
}

async function getNewValue(originalCode: string) {
  const pyo = await getPyodide();
  await pyo.loadPackagesFromImports(
    originalCode,
    console.log.bind(console),
    console.error.bind(console),
  );

  let ovalue = await pyo.runPythonAsync(originalCode);
  console.log(ovalue);
  if (ovalue && ovalue.then) {
    ovalue = await ovalue;
  }

  let value = ovalue.__repr__ ? ovalue.__repr__() : JSON.stringify(ovalue);

  console.log(originalCode, value);
  return value;
}

function getNewValueOb(originalCode: string) {
  return from(
    getNewValue(originalCode).catch((error) => {
      console.error(error);
      return error.toString();
    }),
  );
}

interface CodePageProps {
  codes: Array<string>;
}

class CodePage extends Component<CodePageProps> {
  propsUpdates: Subject<CodePageProps>;
  observable: Observable<any>;
  subscription?: Subscription;
  state: any;

  constructor(props: CodePageProps) {
    super(props);
    this.state = _.object(props.codes.map((_, idx) => [`code_${idx}`, null]));
    this.propsUpdates = new Subject();

    this.observable = this.propsUpdates.pipe(
      map((props) => props.codes),
      distinctUntilChanged(_.isEqual),
      map((codes: Array<string>) =>
        codes
          .map(getNewValueOb)
          .map((obs, idx) =>
            obs.pipe(map((value) => ({ [`code_${idx}`]: value }))),
          ),
      ),
      mergeAll(), // observable array to observables
      mergeAll(), // observables to values
      catchError((error) => {
        console.error(error);
        if (error.trace) {
          console.log(error.trace);
        }
        return [error];
      }),
    );
  }

  componentDidMount() {
    this.subscription = this.observable.subscribe((codes) => {
      if (_.isObject(codes)) {
        this.setState(codes);
      } else {
        console.error(codes);
      }
    });
    this.propsUpdates.next(this.props);
  }

  componentWillReceiveProps(newProps: CodePageProps) {
    this.propsUpdates.next(newProps);
  }

  componentWillUnmount() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  render() {
    const left: Array<JSX.Element> = [];
    const right: Array<JSX.Element> = [];
    let step = 0;
    this.props.codes.forEach((key, idx) => {
      left.push(make(step++, key));

      let value = this.state[`code_${idx}`] || '';
      try {
        value = JSON.stringify(JSON.parse(value), undefined, 2);
      } catch (e) {}
      right.push(make(step++, value));
    });

    return (
      <ContentSlide>
        <span style={{ fontSize: '30px' }}>
          <Columns centered={true} className={'is-12'}>
            <Columns.Column size={'half'}>{left}</Columns.Column>
            <Columns.Column size={'half'}>{right}</Columns.Column>
          </Columns>
        </span>
      </ContentSlide>
    );
  }
}

export default CodePage;
