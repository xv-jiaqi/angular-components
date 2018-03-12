### Examples

#### Confirm

<!-- example(modal-confirm-overview) -->

#### Info

<!-- example(modal-info-overview) -->

#### Toast

<!-- example(modal-toast-overview) -->

#### Common Wrap

<!-- example(modal-wrap-overview) -->

### Inputs

#### Dialog(Config/Info)

##### 简单用法

| 属性             | 说明            |类型           |默认值          |
|-----------------|-----------------|--------------|---------------|
|`options`        |对话框的显示字符串|string          |`''`           |

##### 完整用法

| 属性             | 说明            |类型           |默认值          |
|-----------------|-----------------|--------------|---------------|
|`*options`       |Dialog完整配置项  |GtDialogOption |参见api部分     |

#### Toast

| 属性             | 说明            |类型           |默认值          |
|-----------------|-----------------|--------------|---------------|
|`options`        |Toast配置项       |GtToastOption |`''`           |

### Slot

|名称              | 说明                                 |
|-----------------|-------------------------------------|
|`gt-modal-header`|包裹模态框头部，增加`gt-modal__header`类 |
|`gt-modal-body  `|包裹模态框身体，增加`gt-modal__body`类   |
|`gt-modal-footer`|包裹模态框底部，增加`gt-modal__footer`类 |

