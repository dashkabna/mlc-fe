// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Product',
};

type Props = {
  params: {
    id: string;
  };
};

export default function ProductView({ params }: Props) {
  const { id } = params;

  // return <ProductEditView id={id} />;
}
