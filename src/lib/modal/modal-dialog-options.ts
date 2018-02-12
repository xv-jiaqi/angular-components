export class ButtonOption {
  /** button lable **/
  label: string;

  /** event type **/
  event: 'ok' | 'cancel';

  /** button class **/
  'class': string | object | (string | object)[];
}

export class DialogOption {
  hideHeader? = true;

  hideFooter? = false;

  hideCloseIcon? = true;

  title: string;

  body: string;

  buttons: ButtonOption[];
}
