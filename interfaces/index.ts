export interface TodoProps {
  id: number;
  text: string;
  isComplete: boolean;
}

export interface TodoListProps {
  todos: TodoProps[];
}

export interface LangProps {
  common: {
    title?: string;
    placeholderText?: string;
    addBtnText?: string;
    filterText?: string;
    editTitleText?: string;
    changeLangText?: string;
    cancelBtnText?: string;
    updateBtnText?: string;
  };
}

export interface SelectProps {
  label: string;
  value: string;
}

export interface FilterSelectProps {
  items: SelectProps[];
  onChange?: any;
}
