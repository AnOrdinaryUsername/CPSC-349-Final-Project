import { Accordion, Button, Group, Image, Text } from '@mantine/core';
import type { Project, Task } from 'types';

const TaskItem = ({ isCompleted, description, image, imageAlt }: Task) => {
  return (
    <li>
      {isCompleted ? <s>{description}</s> : <Text>{description}</Text>}
      {image && <Image radius="md" src={image} alt={imageAlt} />}
    </li>
  );
};

interface ProjectAccordionProps extends Partial<Project> {
  index: number;
  onUpdate: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ProjectAccordion = ({
  index,
  name,
  tasks,
  onUpdate,
  onDelete,
}: ProjectAccordionProps) => {
  if (name === undefined || tasks === undefined) {
    throw new Error();
  }

  const projectTasks = tasks.map((task, i) => <TaskItem {...task} key={i} />);

  return (
    <Accordion>
      <Accordion.Item label={name}>
        <ul>{projectTasks}</ul>
        <Group>
          <Button variant="outline" onClick={onUpdate} id={index.toString()}>
            Update
          </Button>
          <Button variant="filled" onClick={onDelete} id={index.toString()}>
            Delete
          </Button>
        </Group>
      </Accordion.Item>
    </Accordion>
  );
};
