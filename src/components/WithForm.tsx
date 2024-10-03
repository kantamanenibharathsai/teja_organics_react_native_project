import React from 'react';
import {useForm, FormProvider, UseFormReturn} from 'react-hook-form';

const withForm = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: Omit<P, 'methods'>) => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <Component {...(props as P)} methods={methods} />
      </FormProvider>
    );
  };
};

export default withForm;
