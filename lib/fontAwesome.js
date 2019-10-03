import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  faBookReader,
  faEye,
  faPencil,
  faPlusCircle,
  faQuestionCircle,
  faTrash,
} from '@fortawesome/pro-duotone-svg-icons';

config.autoAddCss = false;

library.add(
  faTrash,
  faPlus,
  faPencil,
  faEllipsisV,
  faBookReader,
  faPlusCircle,
  faQuestionCircle,
  faArrowLeft,
  faEye
);
