import { Accordion, Button, Group, Image, Text } from '@mantine/core';
import type { Project, Task } from 'types';

const AccordionLabel = ({ name }: Partial<Project>) => {
  return <Text>{name}</Text>;
};

const TaskItem = ({ isCompleted, description, image, imageAlt }: Task) => {
  return (
    <ul>
      <li>
        {isCompleted ? <s>{description}</s> : <Text>{description}</Text>}
        {image && <Image radius="md" src={image} alt={imageAlt} />}
      </li>
    </ul>
  );
};

export const ProjectAccordion = ({ name, tasks }: Partial<Project>) => {
  if (name === undefined || tasks === undefined) {
    throw new Error();
  }

  const projectTasks = tasks.map((task, i) => <TaskItem {...task} key={i} />);

  return (
    <Accordion.Item label={<AccordionLabel name={name} />}>
      {projectTasks}
      <Group>
        <Button variant="outline">Update</Button>
        <Button variant="filled">Delete</Button>
      </Group>
    </Accordion.Item>
  );
};
