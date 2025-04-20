export interface IForm {
    id?: number;
    is_template?: boolean;
    published?: boolean;
    sections: IFormSection[];
    title: string;
    date?: string;
}

export interface ISellerForm {
    id?: number;
    is_template?: boolean;
    published?: boolean;
    sections: ISellerSection[];
    title: string;
    date?: string;
}

export interface IFormSection {
    title: string;
    fields: IFormSectionField[];
}

export interface ISellerSection {
    title: string;
    fields: IFormSellerSectionField
}

export interface IFormSellerSectionField {
    map(arg0: (field: any, fieldIdx: any) => JSX.Element): import("react").ReactNode;
    title: string;
    type: string;
    description: string;
    value: unknown
}

export interface IFormSectionField {
    title: string;
    type: string;
    description: string;
}



