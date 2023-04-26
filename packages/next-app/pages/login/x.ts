type RequiredProperty<T extends object> = {
  [P in keyof T]-?: Required<NonNullable<T[P]>>;
};

type Compulsory<T, K extends keyof T = keyof T> = Omit<T, K> &
  RequiredProperty<Pick<T, K>>;

const initialValues = {
  email: '',
  password: '',
};

type a = Compulsory<typeof initialValues>;

const A:a={
    email: '',
    password: '',
}
