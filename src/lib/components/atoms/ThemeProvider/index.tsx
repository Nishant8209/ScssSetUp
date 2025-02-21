import  { ComponentType } from "react";
import styles from "./ThemeProvider.module.scss"; // Import global styles

// HOC that wraps a component with global theme styles
const withTheme = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => (
    <div className={styles.themeWrapper}>
      <WrappedComponent {...props} />
    </div>
  );
};

export default withTheme;
