import { ChangeEvent, Component } from 'react';

import './ParamEditor.css';

export interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    // colors: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    newModel: Model;
}

type TFormItem = {
    param: Param;
    defaultValue?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type TModel = {
    paramValues: ParamValue[];
};

const FormItem = ({ param, defaultValue, onChange }: TFormItem) => {
    // Для обработки параметров отличных от строк, можно, например, в этом компоненте смотреть на type
    // у Param и в зависимости от него отрисовывать подходящий компонент
    // Пример (появляется тип 'number')
    // if (param.type === 'number') {
    //  return <input type="number" defaultValue={defaultValue} onChange={onChange} />
    // }
    //
    //  return <input type="number" defaultValue={defaultValue} onChange={onChange} />
    //}

    return (
        <label>
            {param.name} <input defaultValue={defaultValue} onChange={onChange} />
        </label>
    );
};

class ParamEditor extends Component<Props, State> {
    public readonly state: State = {
        newModel: {
            paramValues: [],
        },
    };

    constructor(props: Props) {
        super(props);

        const { model } = this.props;

        this.state.newModel = model;
    }

    public getModel(): Model {
        return this.state.newModel;
    }

    getChangeModelHandler = (paramId: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const { newModel } = this.state;
        const index = newModel.paramValues.findIndex(
            (paramValue) => paramValue.paramId === paramId
        );

        this.setState({
            newModel: {
                paramValues: [...newModel.paramValues].map((paramValue, neededIndex) =>
                    neededIndex === index ? { ...paramValue, value: e.target.value } : paramValue
                ),
            },
        });
    };

    getDefaultParamValueById = (paramId: number) => {
        return this.state.newModel.paramValues.find((paramValue) => paramValue.paramId === paramId)
            ?.value;
    };

    render() {
        const { params } = this.props;

        return (
            <form className="form">
                {params.map((param) => {
                    const { id } = param;

                    return (
                        <FormItem
                            key={id}
                            param={param}
                            defaultValue={this.getDefaultParamValueById(id)}
                            onChange={this.getChangeModelHandler(id)}
                        />
                    );
                })}

                <button
                    type="button"
                    onClick={() => {
                        console.log('model:', this.getModel());
                    }}
                >
                    Получить
                </button>
            </form>
        );
    }
}

export default ParamEditor;
