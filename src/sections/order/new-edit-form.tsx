import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axiosInstance, { endpoints, fetcherPost, BaseUrlTypes, getBaseUrl } from 'src/utils/axios';

import FormProvider from 'src/components/hook-form';
import { SkeletonForm } from 'src/components/skeleton';

import { order } from 'src/types/types';

import NewEditItems from './new-edit-items';
// ----------------------------------------------------------------------

type Props = {
  detailData: order | null;
  isLoading: boolean;
  isEdit: boolean;
  updateId: string;
};

export default function NewEditForm({ detailData, isLoading, isEdit, updateId }: Props) {
  const router = useRouter();

  const loadingSave = useBoolean();

  const Schema = Yup.object().shape({
    totalPrice: Yup.number().required('price is required'),
    userId: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      totalPrice: detailData?.totalPrice ? detailData?.totalPrice : 0,
      userId: detailData?.userId ? detailData?.userId : 0,
    }),
    [detailData]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [updateId, reset, defaultValues]);

  const handleSaveAsDraft = handleSubmit(async (data) => {
    loadingSave.onTrue();

    try {
      // const response = await fetcherPost(
      //   BaseUrlTypes.ENUM_HOST_BASE_URI,
      //   isEdit ? endpoints.orderId(updateId) : endpoints.order,
      //   data,
      //   {}
      // );

      const response = await axiosInstance.post(
        `/api/post?url=${
          getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI) +
          (isEdit ? endpoints.orderId(updateId) : endpoints.order)
        }`,
        data
      );

      if (response?.data?.status === 1) {
        reset();
        router.push(paths.dashboard.group.order.root);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('error');
    }
    loadingSave.onFalse();
  });

  return isLoading ? (
    <SkeletonForm />
  ) : (
    <FormProvider methods={methods}>
      <NewEditItems isEdit={isEdit} />

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSave.value && isSubmitting}
          onClick={handleSaveAsDraft}
        >
          {isEdit ? 'Засах' : 'Үүсгэх'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
