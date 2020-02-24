
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const StyledForm = styled.form`
  padding: 32px 16px;
  margin: 0 auto;
  max-width: 768px;

  & > * {
    margin-bottom: 32px !important;

    &:last-child {
      margin-bottom: 0 !important;
    }
  }
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
`;

export const StyledCtaWrapper = styled.div`
  text-align: right;
`;