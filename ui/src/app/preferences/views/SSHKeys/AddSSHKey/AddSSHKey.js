import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import React from "react";

import { sshkey as sshkeyActions } from "app/preferences/actions";
import { sshkey as sshkeySelectors } from "app/preferences/selectors";
import { useAddMessage } from "app/base/hooks";
import { useWindowTitle } from "app/base/hooks";
import SSHKeyFormFields from "../SSHKeyFormFields";
import FormCard from "app/base/components/FormCard";
import FormCardButtons from "app/base/components/FormCardButtons";
import FormikForm from "app/base/components/FormikForm";

const SSHKeySchema = Yup.object().shape({
  protocol: Yup.string().required("Source is required"),
  auth_id: Yup.string().when("protocol", {
    is: val => val && val !== "upload",
    then: Yup.string().required("ID is required")
  }),
  key: Yup.string().when("protocol", {
    is: val => val === "upload",
    then: Yup.string().required("Key is required")
  })
});

export const AddSSHKey = () => {
  const dispatch = useDispatch();
  const errors = useSelector(sshkeySelectors.errors);
  const saved = useSelector(sshkeySelectors.saved);
  const saving = useSelector(sshkeySelectors.saving);

  useWindowTitle("Add SSH key");

  useAddMessage(saved, sshkeyActions.cleanup, "SSH key successfully imported.");

  return (
    <FormCard title="Add SSH key">
      <FormikForm
        buttons={FormCardButtons}
        cleanup={sshkeyActions.cleanup}
        errors={errors}
        initialValues={{ auth_id: "", protocol: "", key: "" }}
        onSubmit={values => {
          if (values.key && values.key !== "") {
            dispatch(sshkeyActions.create(values));
          } else {
            dispatch(sshkeyActions.import(values));
          }
        }}
        saving={saving}
        saved={saved}
        savedRedirect="/account/prefs/ssh-keys"
        submitLabel="Import SSH key"
        validationSchema={SSHKeySchema}
      >
        <SSHKeyFormFields />
      </FormikForm>
    </FormCard>
  );
};

export default AddSSHKey;
