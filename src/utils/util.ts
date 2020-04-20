interface DataFormat<T> {
  data: T;
  success: boolean;
  msg?: string;
}

export default function <T>(data: T, msg?: string): DataFormat<T> {
  if (msg) {
    return {
      success: false,
      data,
      msg,
    };
  } else {
    return {
      success: true,
      data,
    };
  }
}
