// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Task',
};

type Props = {
  params: {
    id: string;
  };
};

export default function TaskView({ params }: Props) {
  const { id } = params;

  // return <TaskEditView id={id} />;
}
