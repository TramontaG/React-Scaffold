import React, { JSX } from "react";

type ForEachProps<TData> = {
  data: Readonly<TData[]>;
  idCompute: (data: TData) => string;
  render: (data: TData, index: number) => JSX.Element;
};

export const ForEach = <TData,>(props: ForEachProps<TData>) => {
  return props.data.map((data, index) => (
    <React.Fragment key={props.idCompute(data)}>
      {props.render(data, index)}
    </React.Fragment>
  ));
};
