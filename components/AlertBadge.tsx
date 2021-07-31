import React, { FC } from "react";
import { Alert } from "native-base";
//Exports
import { AlertBadgeProps } from "../exports/index";

const AlertBadge: FC<AlertBadgeProps> = ({ status, alertDes }) => {
  return (
    <Alert variant="left-accent" status={status}>
      <Alert.Icon />
      <Alert.Title>{alertDes}</Alert.Title>
    </Alert>
  );
};

export default AlertBadge;
