import { Modal, Select, Stack, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import * as React from 'react';
import { Box, Calendar, Pennant } from 'tabler-icons-react';

interface EditProjectModalProps {
  opened: boolean;
  onClose: () => void;
}

export const EditProjectModal = ({ opened, onClose }: EditProjectModalProps) => {
  return (
    <Modal
      centered
      withCloseButton={true}
      opened={opened}
      onClose={onClose}
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <form>
        <Stack px="md" pb="md">
          <Title order={2}>Edit project</Title>
          <TextInput
            size="md"
            icon={<Box size={20} />}
            placeholder="Your project name"
            label="Project name"
            description="The name of the group of tasks you wish to accomplish."
            required
          />
          <DatePicker
            dropdownType="modal"
            size="md"
            icon={<Calendar size={20} />}
            placeholder="Pick date"
            label="Date"
            description="The date when you want to complete the project."
            minDate={dayjs(new Date()).toDate()}
            required
          />
          <Select
            size="md"
            icon={<Pennant size={20} />}
            label="Priority level"
            placeholder="Pick one"
            data={[
              { value: '1', label: 'Level 1' },
              { value: '2', label: 'Level 2' },
              { value: '3', label: 'Level 3' },
              { value: '4', label: 'Level 4' },
              { value: '5', label: 'Level 5' },
            ]}
          />
        </Stack>
      </form>
    </Modal>
  );
};
