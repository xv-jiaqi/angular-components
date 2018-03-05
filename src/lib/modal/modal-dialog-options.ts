export class GtButtonOption {
  /** button lable **/
  label: string;

  /** event type **/
  event: 'ok' | 'cancel';

  /** button class **/
  'class': string | object | (string | object)[];
}

export class GtDialogOption {
  hideHeader? = true;

  hideFooter? = false;

  hideCloseIcon? = true;

  title: string;

  body: string;

  buttons: GtButtonOption[];
}
