import './App.css';
import ParamEditor, { Param, TModel } from './ParamEditor/ParamEditor';

const params: Param[] = [
    {
        id: 1,
        name: 'Назначение',
        type: 'string',
    },
    {
        id: 2,
        name: 'Длина',
        type: 'string',
    },
];

const model: TModel = {
    paramValues: [
        {
            paramId: 1,
            value: 'повседневное',
        },
        {
            paramId: 2,
            value: 'макси',
        },
    ],
};

function App() {
    return (
        <>
            {/* <button onClick={() => ParamEditor.setTime(5)}>update</button> */}
            <ParamEditor params={params} model={model} />
        </>
    );
}

export default App;
