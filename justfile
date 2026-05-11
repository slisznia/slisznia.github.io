# Portfolio dev recipes. Run `just` to list.

pidfile := ".dev.pid"
logfile := ".dev.log"
port    := "5173"

# Show available recipes
default:
    @just --list

# Install npm dependencies
install:
    npm install

# Start the Vite dev server in the background; writes pid and logs
dev:
    #!/usr/bin/env bash
    set -u
    if [ -f {{pidfile}} ] && kill -0 "$(cat {{pidfile}})" 2>/dev/null; then
        echo "dev server already running (pid $(cat {{pidfile}})) — http://localhost:{{port}}/"
        exit 0
    fi
    rm -f {{pidfile}} {{logfile}}
    # setsid puts npm + its children into a new process group so stop can signal the whole tree
    setsid nohup npm run dev > {{logfile}} 2>&1 < /dev/null &
    echo $! > {{pidfile}}
    sleep 1
    echo "dev server starting (pid $(cat {{pidfile}})) — http://localhost:{{port}}/"
    echo "tail logs:  just logs"
    echo "stop:       just stop"

# Stop the background dev server
stop:
    #!/usr/bin/env bash
    set -u
    if [ ! -f {{pidfile}} ]; then
        echo "no pidfile; nothing to stop"
        exit 0
    fi
    pid=$(cat {{pidfile}})
    if kill -0 "$pid" 2>/dev/null; then
        # pgid == pid because dev was launched with setsid; signal the whole group
        kill -TERM -- "-$pid" 2>/dev/null || kill -TERM "$pid" 2>/dev/null || true
        sleep 1
        if kill -0 "$pid" 2>/dev/null; then
            kill -KILL -- "-$pid" 2>/dev/null || kill -KILL "$pid" 2>/dev/null || true
        fi
        echo "dev server stopped (was pid $pid)"
    else
        echo "process $pid not running"
    fi
    rm -f {{pidfile}}

# Restart the dev server
restart: stop dev

# Show the dev server status
status:
    @if [ -f {{pidfile}} ] && kill -0 $(cat {{pidfile}}) 2>/dev/null; then \
        echo "running (pid $(cat {{pidfile}})) — http://localhost:{{port}}/"; \
    else \
        echo "not running"; \
    fi

# Tail the dev server log
logs:
    @test -f {{logfile}} && tail -f {{logfile}} || echo "no log file yet — start with: just dev"

# Run TypeScript type check
check:
    npm run type-check

# Run production build (type-check + vite build)
build:
    npm run build

# Preview the production build
preview:
    npm run preview

# Remove build artifacts and dev pid/log
clean:
    rm -rf dist {{pidfile}} {{logfile}}
