export interface ParentInt {
  name?: string,
  attributes?: {id: string},
  parent?: ParentInt,
  children?: ChildInt[]
}

export interface ComponentInt {
  name: string,
  attributes?: {id: string},
  parent?: ParentInt,
  children: ChildInt[]
}

export interface ChildInt {
  name: string,
  attributes?: {id: string},
  parent?: ParentInt,
  children: ChildInt[]
}

export interface AddPanelInt {
  data: ComponentInt,
  name: string,
  handleClose: () => void
}

export interface ComponentPanelInt {
  modal: boolean,
  handleClose: () => void
}

export interface ComponentStateInt {
  error: null,
  loading: boolean,
  data: any[]
}

export interface CurrentComponentStateInt {
  error: null,
  loading: null,
  data: object
}

export interface DirectoryStateInt {
  loading: boolean,
  error: null,
  data: { root: {

    }, file: string }
}

export interface SelectedComponentStateInt {
  loading: boolean,
  error: null,
  data: object
}

export interface GlobalState {
  components: {
    data: ComponentInt[]
  }
  current: {
    data: {
      name: string,
      attributes: {id: string},
      parent?: ParentInt,
      children: ChildInt[]
    }
  }
  directory: {
    data: {
      path: any,
      root: {
        path: string,
        children: any
      }
    }
  }
  code: {
    data: {

    }
  }
  resolver: {
    data: {

    }
  }
  selected: {
    data: ComponentInt
  }
}
