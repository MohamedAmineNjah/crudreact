import { Button, Snackbar } from "@material-ui/core";
import React from "react";
import { Alert } from "reactstrap";



export const validateRequired = (data: any, propertyToCheck: any, setMessageFunction: any) => {
    let isrequired = false;
    const messageToShow = 'Vérifiez les champs saisies';
    propertyToCheck.map((item: any) => {
        if (data[item.field] === '' || !data[item.field]) {

            isrequired = true;
        }
    });
    setMessageFunction(messageToShow);
    return isrequired;
};

export const validateErrorOnField = (regexValues: { [s: string]: any; } | ArrayLike<any>) => {
    let isrequired = false;
    for (const [key, value] of Object.entries(regexValues)) {
        console.log('validateErrorOnField');
        console.log(regexValues);
        if (value['isOnError']) { isrequired = true; break; } else { isrequired = false }
    }
    return isrequired;
};



export const SnackBarCustom = (props: any) => {
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={props.isSnackOpen}
                autoHideDuration={6000}
                onClose={props.handleClose}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={props.handleClose}>
                            UNDO
              </Button>
                    </React.Fragment>
                }
            >
                <Alert severity="error">{props.textMessage}</Alert>
            </Snackbar>
        </div>
    );
};




export const numberRegex = { pattern: new RegExp('^[0-9]*$'), type: 'numerique' };
