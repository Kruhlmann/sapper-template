export function handle_warning(warning, next) {
    const is_circular_warning = warning.code === "CIRCULAR_DEPENDENCY";
    const is_sapper_error = /[/\\]@sapper[/\\]/.test(warning.message);

    if (!is_circular_warning && !is_sapper_error) {
        next(warning);
    }
}
