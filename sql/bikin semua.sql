
-- Create the reference_table
CREATE TABLE adminkey (
    id SERIAL PRIMARY KEY,
    key TEXT NOT NULL UNIQUE
);

ALTER TABLE adminkey ENABLE ROW LEVEL SECURITY;

CREATE POLICY hanya_rpc
ON adminkey -- [][][][][][][][][][][][][][][][][][][][][][]
FOR ALL
USING (
    auth.role() = 'service_role'
);
-- ======================================================
--
--
--
--
--
--
--
--
--
-- ======================================================

-- Step 1: Create the target_table
CREATE TABLE buffer_list ( -- [][][][][][][][][][][][][][][][][][][][][][]
    id SERIAL PRIMARY KEY,
    usage TEXT NOT NULL,
    buffer TEXT NOT NULL,
    source TEXT NOT NULL
);

-- Step 2: Enable RLS on target_table
ALTER TABLE buffer_list ENABLE ROW LEVEL SECURITY;

-- Step 3: Create an RLS policy to restrict direct access
CREATE POLICY hanya_rpc
ON buffer_list -- [][][][][][][][][][][][][][][][][][][][][][]
FOR ALL
USING (
    auth.role() = 'service_role' -- Allow only RPC (service role) access
);

-- Step 4: Create the RPC function
-- insert row
CREATE OR REPLACE FUNCTION insbuf( -- [][][][][][][][][][][][][][][][][][][][][][]
    name_to_check TEXT,
    new_data JSONB
)

RETURNS TEXT AS $$
BEGIN

    -- Check if the name exists in the reference_table
    IF EXISTS (
        SELECT 1
        FROM adminkey
        WHERE key = name_to_check
    )

	THEN
        INSERT INTO buffer_list (usage, buffer, source) -- [][][][][][][][][][][][][][][][][][][][][][]
        VALUES (
            new_data->>'usage',
            new_data->>'buffer',
            new_data->>'source'
        );
        RETURN 'OK, inserted';

    ELSE
        -- Return error message
        RETURN 'error: admin key salah.';

    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ======================================================
-- sampe sini, bikin updbuf, delbuf
