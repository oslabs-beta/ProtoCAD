export interface ParentInt {
  name?: string,
  attributes?: {id: string},
  parent?: ParentInt,
  children?: ChildInt[]
}

export interface ComponentInt {
  name: string,
  attributes: {id: string},
  parent?: ParentInt,
  children: ChildInt[]
}

export interface ChildInt {
  name: string,
  attributes: {id: string},
  parent?: ParentInt,
  children: ChildInt[]
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
    data: {

    }
  }
  current: {
    data: {
      name: string
    }
  }
  directory: {
    data: {
      root: {
        path: string
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
}
