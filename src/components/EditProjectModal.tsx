import {
  Button,
  createStyles,
  Group,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import * as React from 'react';
import { Box, Calendar, LetterCaseUpper, Pennant, Photo } from 'tabler-icons-react';
import type { Project, Task } from 'types';

const useStyles = createStyles((theme) => ({
  input: {
    // Used to make inputs go side-by-side on the same line
    maxWidth: 'calc(50% - 8px)',
  },

  stack: {
    position: 'relative',

    // Draws a line for separating content
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '1px',
      bottom: 0,
      left: 0,
      right: 0,
      borderBottom: `1px solid ${theme.colors.gray[4]}`,
    },
  },
}));

const initializeTask = (id: number): Task => ({
  id: id,
  isCompleted: false,
  description: '',
  image: '',
  imageAlt: '',
});

interface EditProjectModalProps {
  opened: boolean;
  projectData: Project;
  updateTracker: (project: Project) => void;
  onClose: () => void;
  updateProjects: (project: Project) => void;
}

export const EditProjectModal = ({
  projectData,
  opened,
  onClose,
  updateTracker,
  updateProjects,
}: EditProjectModalProps) => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      name: '',
      date: '',
      priorityLevel: '1',
      taskDescription: '',
      taskImage: '',
      taskImageAlt: '',
    },
  });
  // const [tasks, setTasks] = React.useState<Task[]>([...projectData.tasks]);

  function saveProject(values: any) {
    const currentProject = {
      id: projectData.id,
      name: values.name,
      date: values.date,
      priorityLevel: values.priorityLevel,
      tasks: [
        {
          id: projectData.tasks[0].id,
          isCompleted: projectData.tasks[0].isCompleted,
          description: values.taskDescription,
          image: values.taskImage,
          imageAlt: values.taskImageAlt,
        },
      ],
    };
    updateTracker(currentProject);
    updateProjects(currentProject);
  }

  return (
    <Modal
      centered
      withCloseButton={true}
      opened={opened}
      onClose={onClose}
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="outside"
      title={<Title order={2}>Edit Project</Title>}
      padding="xl"
    >
      <form onSubmit={form.onSubmit((values) => saveProject(values))}>
        <Stack className={classes.stack} pb="xl">
          <Group>
            <TextInput
              className={classes.input}
              size="sm"
              icon={<Box size={20} />}
              placeholder="Your project name"
              label="Project name"
              description="Name of your group of tasks"
              required
              {...form.getInputProps('name')}
            />
            <DatePicker
              className={classes.input}
              dropdownType="modal"
              size="sm"
              icon={<Calendar size={20} />}
              placeholder="Pick date"
              label="Date"
              description="Project completion date"
              inputFormat="MM/DD/YYYY"
              minDate={dayjs(new Date()).toDate()}
              required
              {...form.getInputProps('date')}
            />
          </Group>
          <Select
            size="sm"
            icon={<Pennant size={20} />}
            label="Priority level"
            placeholder="Pick one"
            description="Determines the order of projects shown to you"
            defaultValue="1"
            data={[
              { value: '1', label: 'Level 1' },
              { value: '2', label: 'Level 2' },
              { value: '3', label: 'Level 3' },
              { value: '4', label: 'Level 4' },
              { value: '5', label: 'Level 5' },
            ]}
            {...form.getInputProps('priorityLevel')}
          />
        </Stack>
        <Stack className={classes.stack} pt="md" pb="xl">
          <Textarea
            placeholder="I need to do the dishes!"
            label="Task"
            description="Add the details of a single task"
            required
            {...form.getInputProps('taskDescription')}
          />
          <Group>
            <TextInput
              className={classes.input}
              size="sm"
              icon={<Photo size={20} />}
              placeholder="Image url"
              label="Optional image"
              description="Link to an image for your task"
              {...form.getInputProps('taskImage')}
            />
            <TextInput
              className={classes.input}
              size="sm"
              icon={<LetterCaseUpper size={20} />}
              placeholder="Image alt"
              label="Optional image alt"
              description="Alternative text for task image"
              {...form.getInputProps('taskImageAlt')}
            />
          </Group>
        </Stack>
        <Group position="right" pt="xl">
          <Button variant="outline">Add new task</Button>
          <Button variant="filled" type="submit">
            Save changes
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

/*
interface TaskItemProps {
  uniqueId: number;
}

function TaskItem({ uniqueId }: TaskItemProps) {
  const { classes } = useStyles();

  return (
    <Stack className={classes.stack} pt="md" pb="xl">
      <Textarea
        id={uniqueId.toString()}
        placeholder="I need to do the dishes!"
        label="Task"
        description="Add the details of a single task"
        required
      />
      <Group>
        <TextInput
          id={uniqueId.toString()}
          className={classes.input}
          size="sm"
          icon={<Photo size={20} />}
          placeholder="Image url"
          label="Optional image"
          description="Link to an image for your task"
        />
        <TextInput
          id={uniqueId.toString()}
          className={classes.input}
          size="sm"
          icon={<LetterCaseUpper size={20} />}
          placeholder="Image alt"
          label="Optional image alt"
          description="Alternative text for task image"
        />
      </Group>
    </Stack>
  );
}
*/
