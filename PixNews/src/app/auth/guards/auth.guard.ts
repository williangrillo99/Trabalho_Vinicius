import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../login/login.service";
import { of, switchMap } from "rxjs";

export const AuthGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);

    return inject(LoginService)
        .isAuthenticated$
        .pipe(
            switchMap((authenticated) => {
                if (!authenticated) {
                    router.navigateByUrl(`/login`);
                    return [false];
                }
                return of(true);
            })
        );
};