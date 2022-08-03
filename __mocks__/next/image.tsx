import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

const Image = (
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  // eslint-disable-next-line @next/next/no-img-element
) => <img alt="" {...props} />;

export default Image;
